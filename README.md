# 立国志官方网站

立国志旗下运营日本国志堂拍卖会、黑龙江国志堂中医健康养生管理、日本留学劳务中介和中日相亲会等多元化业务。本网站支持中文和日文双语版本，采用响应式设计，适配各种设备。

## 项目特色

- 🌐 **多语言支持**: 中文/日文双语版本
- 📱 **响应式设计**: 完美适配桌面、平板、手机
- 🎨 **现代设计**: 符合中日两国审美标准
- ⚡ **性能优化**: 快速加载，流畅体验
- 🔍 **SEO友好**: 搜索引擎优化
- ♿ **无障碍访问**: 支持键盘导航和屏幕阅读器

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: CSS Grid, Flexbox, CSS Variables
- **字体**: Noto Sans SC (中文), Noto Sans JP (日文)
- **图标**: Font Awesome 6
- **构建工具**: 原生开发，无需复杂构建流程

## 项目结构

```
liguozhi/
├── index.html              # 主页面
├── styles/
│   ├── main.css           # 主要样式
│   └── responsive.css     # 响应式样式
├── scripts/
│   └── main.js           # 主要JavaScript功能
├── package.json          # 项目配置
└── README.md            # 项目说明
```

## 功能特性

### 多语言支持
- 中文/日文实时切换
- 语言偏好本地存储
- 自动更新页面内容

### 响应式布局
- 移动端优先设计
- 断点优化 (480px, 768px, 992px, 1200px)
- 触摸友好的交互

### 交互功能
- 平滑滚动导航
- 移动端汉堡菜单
- 表单验证和提交
- 滚动动画效果

### 性能优化
- 图片懒加载
- 防抖滚动事件
- CSS动画优化
- 代码分割

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 设计理念

### 中文版设计
- **色彩**: 现代商务蓝 (#2563eb)
- **风格**: 简洁大方，专业稳重
- **布局**: 对称平衡，信息层次清晰
- **字体**: Noto Sans SC，易读性强

### 日文版设计
- **色彩**: 优雅深蓝 (#2c5aa0)
- **风格**: 简约精致，注重细节
- **布局**: 留白充分，视觉舒适
- **字体**: Noto Sans JP，符合日文阅读习惯

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 性能指标

- **首屏加载时间**: < 2秒
- **Lighthouse评分**: 90+
- **移动端适配**: 完美支持
- **无障碍评分**: AA级别

## 部署说明

### 静态部署
项目为纯静态网站，可部署到任何静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

### 服务器部署
```bash
# 使用nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/liguozhi;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 自定义配置

### 修改品牌信息
编辑 `index.html` 中的以下内容：
- 公司名称
- 联系方式
- 服务项目
- 案例展示

### 调整样式
修改 `styles/main.css` 中的CSS变量：
```css
:root {
    --primary-color: #your-color;
    --font-family-zh: 'Your-Font';
}
```

### 添加新语言
1. 在HTML元素中添加 `data-xx` 属性
2. 在JavaScript中添加语言映射
3. 更新CSS字体配置

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 网站: https://liguozhi.com
- 邮箱: info@liguozhi.com
- 电话: +86-10-1234-5678

## 更新日志

### v1.0.0 (2025-01-15)
- 初始版本发布
- 多语言支持
- 响应式设计
- 基础功能实现

---

**立国志团队** - 专业服务，创造价值
