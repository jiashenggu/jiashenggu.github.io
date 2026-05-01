# 项目优化记录

生成时间：2026-05-01

## 目标

把原 Jekyll / AcadHomepage 模板站点重构为更现代、轻量、可维护的 Astro 静态站点，并尽量消除当前项目里能看到的合理优化空间。

## 已完成优化

### 1. 框架迁移

- 从 Jekyll 3 / `github-pages` 迁移到 Astro 6 静态输出。
- 删除旧 Jekyll 入口和模板目录：`Gemfile`、`Gemfile.lock`、`_config.yml`、`_includes/`、`_layouts/`、`_pages/`、`_sass/`、旧 `assets/`、旧 `images/`、旧 `docs/`。
- 新增 Astro 项目入口：
  - `astro.config.mjs`
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `.node-version`

### 2. 内容结构

- 把主页内容从 Markdown/模板混写迁移为结构化 TypeScript 数据和 Scholar 运行时数据：
  - `src/data/profile.ts`
  - `src/data/resume.ts`
- 保留并整理了原主页中的个人简介、honors、education、service、internships。
- publication 列表改为运行时从 Google Scholar 生成的 `gs_data.json` 读取，Google Scholar 成为论文信息源。
- 丢弃了旧模板中不属于当前个人主页的示例内容，例如 `news.md` 和 `pub_short.md` 里来自模板作者的示例数据。

### 3. 前端与性能

- 移除了旧的 jQuery 1.12.4、Magnific Popup、Stickyfill、FitVids、Smooth Scroll、Greedy Navigation 等脚本依赖。
- 移除了 Font Awesome / Academicons 字体包和旧 Sass vendor 目录。
- 新站点默认只输出静态 HTML、压缩 CSS 和一个很小的 Google Scholar fetch 脚本。
- favicon/profile image 迁移到 `public/images/`，由 Astro 原生复制到 `dist/`。
- 新增响应式布局：
  - 桌面：左侧 profile panel + 右侧内容流。
  - 移动端：单列布局，导航自动换行。
- 新增可访问性基础：
  - Skip link
  - 语义化 `main` / `section` / `nav` / `aside`
  - 明确的 `aria-label` / `aria-labelledby`
  - `:focus-visible` 焦点样式
  - `prefers-reduced-motion` 支持

### 4. SEO

- 修复旧模板中 `<head>` 嵌套 `<head>`、全局 `<base target="_blank">` 等 HTML 结构问题。
- 新增 canonical URL、Open Graph、Twitter Card、Person JSON-LD。
- 新增 `@astrojs/sitemap`，构建时生成 `sitemap-index.xml`。
- 新增 `public/robots.txt`。
- 新增有效的 `site.webmanifest`，修复旧 manifest icon 路径错误。

### 5. GitHub Actions

- 新增 `.github/workflows/deploy.yml`：
  - 使用 Astro 官方 `withastro/action@v6`
  - 使用 Node 22
  - 在部署前执行 `npm run check && npm run build`
  - 部署到 GitHub Pages
- 更新 `.github/workflows/google_scholar_crawler.yaml`：
  - 使用新版 checkout/setup-python action
  - 增加 `workflow_dispatch`
  - 增加并发控制和 15 分钟超时
  - 设置最小所需权限 `contents: write`
  - pip 缓存 keyed by `requirements.txt`
  - 发布结果到 `google-scholar-stats` 分支

### 6. Python Scholar Crawler

- 重写 `google_scholar_crawler/main.py`：
  - 增加 `main()` 入口
  - 增加 `GOOGLE_SCHOLAR_ID` 校验
  - 输出路径固定为脚本目录下的 `results/`
  - 使用 UTC ISO 时间戳
  - 支持 `SERPAPI_API_KEY`，优先通过 SerpApi Google Scholar Author API 拉取 Scholar 数据
  - 增加 `publications_list` 和 `publication_count`，供首页直接渲染 Scholar 论文列表
  - 增加错误输出和非零退出码
  - JSON 输出格式稳定、可读
- 精简并升级依赖：
  - 删除未使用的 `jsonpickle`
  - `scholarly` 从 `1.5.1` 升级到 `1.7.11`

### 7. 依赖安全

- 新增 `npm audit --audit-level=moderate` 验证。
- `@astrojs/check` 依赖链中的 `yaml` moderate 漏洞通过 `package.json` `overrides` 升级到安全版本。
- 当前 `npm audit --audit-level=moderate` 结果为 0 个漏洞。

## 验证记录

已在本地执行：

```bash
npm install
npm audit --audit-level=moderate
npm run check
npm run build
python3 -m py_compile google_scholar_crawler/main.py
```

结果：

- `npm audit --audit-level=moderate`：0 vulnerabilities
- `npm run check`：0 errors, 0 warnings, 0 hints
- `npm run build`：成功生成 `dist/`
- `python3 -m py_compile google_scholar_crawler/main.py`：通过

还进行了本地 Astro preview：

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

并用 Playwright 生成了桌面和移动端截图：

- `/tmp/jiashenggu-astro-desktop.png`，1280 x 900
- `/tmp/jiashenggu-astro-mobile.png`，390 x 844

本地 `curl --noproxy '*' -I http://127.0.0.1:4321/` 返回 `HTTP/1.1 200 OK`。

## 仍需注意

- GitHub Pages 需要在仓库设置里选择 **GitHub Actions** 作为 Pages source。
- Google Scholar stats workflow 需要仓库 variable：`GOOGLE_SCHOLAR_ID`。
- SerpApi 稳定抓取需要仓库 secret：`SERPAPI_API_KEY`；没有该 secret 时 crawler 会回退到 `scholarly`。
- LinkedIn 链接目前按原 `_config.yml` 的 `jiashenggu` 保留；旧 `homepage.md` 中曾出现 `jiasheng-gu`，如果实际账号不同，建议确认后改 `src/data/profile.ts`。
- Scholar 数据依赖 `google-scholar-stats` 分支存在；首次 workflow 成功运行前，`gs_data.json` 会是 404，页面会显示 citation / publication unavailable 状态。
- publication 列表现在完全以 Google Scholar 为准；如果 Scholar profile 中条目缺失或 venue/year 不完整，网站也会同步体现出来。
