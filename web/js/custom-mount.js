/**
 * 挂载自定义导航下拉菜单和页脚链接。
 *
 * 不修改独立的 app.js/app.css。在 app.js 执行完成后注入 DOM。
 * 所有元素通过动态创建并添加到上游的 header/nav/footer 中。
 */
(function mountCustomNavigation() {
    /* ---- 1. 下拉菜单项 ---- */
    /** @type {Array<{label:string, href:string}>} */
    var links = [
        { label: 'HA面板',   href: 'https://homeassistant.lmhome.leuse.top:8443/'                 },
        { label: '智能家居', href: 'https://nodered.lmhome.leuse.top:8443/'                        },
        { label: '刮削面板', href: 'https://T4.lmhome.leuse.top:8443/scrape'                        },
        { label: '容器管理', href: 'https://panel.lmhome.leuse.top:8443/'                           },
        { label: '网盘管理', href: 'https://openlist.lmhome.leuse.top:8443/'                        }
    ];

    /* ---- footer 外链 ---- */
    /** @type {Array<{label:string, href:string}>} */
    var footerLinks = [
        { label: 'VPS-AK', href: 'https://vpsak.leuse.top/'   },
        { label: 'VPS-DN', href: 'https://www.vpsdn.leuse.top/' }
    ];

    function insertDropdown() {
        var nav = document.getElementById('navTabs');
        if (!nav) return;

        // ----- 创建下拉容器 .dropdown-nav -----
        var container = document.createElement('div');
        container.className = 'dropdown-nav';

        // 按钮
        var btn = document.createElement('button');
        btn.className = 'dropdown-btn';
        btn.type = 'button';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-haspopup', 'true');
        btn.textContent = '\u5176\u4ED6'; // "其他"
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // 菜单
        var menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        menu.setAttribute('role', 'menu');

        links.forEach(function (item) {
            var a = document.createElement('a');
            a.href = item.href;
            a.className = 'dropdown-item';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = item.label;
            menu.appendChild(a);
        });

        container.appendChild(btn);
        container.appendChild(menu);
        // 插入到 navTabs 末尾
        nav.appendChild(container);
    }

    /* ---- Footer links ---- */
    function replaceFooter() {
        var footer = document.querySelector('footer.footer');
        if (!footer) return;

        // 保留上游 footer 的第一个链接（如果有），并在末尾追加 VPS 链接
        // 简洁方式：完全替换 footer 内容
        footer.innerHTML = '';

        footerLinks.forEach(function (item) {
            var a = document.createElement('a');
            a.href = item.href;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = item.label;
            footer.appendChild(a);
        });
    }

    // repeatedly check in case app.js defers rendering,
    // but typically these DOM nodes exist inline
    var attempts = 0;
    var maxAttempts = 20;

    function tryMount() {
        attempts++;
        if (attempts > maxAttempts) return;

        var nav  = document.getElementById('navTabs');
        var footer = document.querySelector('footer.footer');
        if (nav && footer) {
            insertDropdown();
            replaceFooter();
        } else {
            requestAnimationFrame(tryMount);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryMount);
    } else {
        tryMount();
    }
})();