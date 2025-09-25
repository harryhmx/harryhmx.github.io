document.addEventListener('DOMContentLoaded', function() {
    // Them
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Check theme setting in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    }

    // Theme toggle button click event
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });

    // Navigation bar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Navigation bar hamburger menu icon
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        // Create HTML structure for three bars
        const togglerIcon = document.querySelector('.navbar-toggler-icon');
        togglerIcon.innerHTML = '<span class="middle-bar"></span>';
    }

    // Fix code block line breaks - convert <br> tags to actual line breaks while preserving syntax highlighting and indentation
    function fixCodeBlocks() {
        const codeElements = document.querySelectorAll('.highlight code, .code-block-wrapper code, pre code');
        codeElements.forEach(function(codeElement) {
            // Get the HTML content
            let html = codeElement.innerHTML;

            // Step 1: Replace <br> tags with newlines first
            html = html.replace(/<br\s*\/?>/gi, '\n');

            // Step 2: Create a temporary div to parse HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Step 3: Process all text nodes to decode HTML entities while preserving whitespace
            function decodeTextNodes(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Decode HTML entities in text content while preserving all whitespace
                    let text = node.textContent;
                    text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                    // Ensure leading and trailing spaces are preserved
                    node.textContent = text;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Recursively process child nodes
                    Array.from(node.childNodes).forEach(decodeTextNodes);
                }
            }

            // Process all child nodes
            Array.from(tempDiv.childNodes).forEach(decodeTextNodes);

            // Step 4: Reconstruct the code with proper formatting
            let finalContent = tempDiv.textContent || tempDiv.innerText;

            // Step 5: Set the text content directly to preserve all whitespace
            codeElement.textContent = finalContent;

            // Step 6: Add proper styling to preserve indentation
            codeElement.style.whiteSpace = 'pre';
            codeElement.style.fontFamily = "'Consolas', 'Monaco', 'Courier New', monospace";
            codeElement.style.fontSize = '14px';
            codeElement.style.lineHeight = '1.5';
            codeElement.style.display = 'block';
            codeElement.style.overflowX = 'auto';
            codeElement.style.tabSize = '4';
            codeElement.style.MozTabSize = '4';
            codeElement.style.OTabSize = '4';

            // Step 7: Re-apply syntax highlighting if hljs is available
            if (window.hljs) {
                hljs.highlightElement(codeElement);
            }
        });
    }

    // Fix LaTeX matrix line breaks - convert single backslashes to double backslashes for matrix row separators
    function fixLaTeXMatrices() {
        // Fix raw LaTeX in the page content (before MathJax processes it)
        const bodyContent = document.body.innerHTML;

        // Very specific fix for the pattern: a & b \ c & d
        // This directly targets the problematic pattern we see in the HTML
        const fixedBodyContent = bodyContent.replace(/\\begin{(pmatrix|bmatrix|vmatrix|Vmatrix)}([^]*?)\\end{\1}/g, function(match, envType, content) {
            // Replace " \ " (space backslash space) with " \\ " (space double backslash space)
            content = content.replace(/(\s+)\\(\s+)/g, '$1\\\\$2');

            // Also handle " \&amp; " pattern (the actual HTML escaped version)
            content = content.replace(/(\s+)\\(\s*)&amp;(\s+)/g, '$1\\\\$2&amp;$3');

            return '\\begin{' + envType + '}' + content + '\\end{' + envType + '}';
        });

        if (bodyContent !== fixedBodyContent) {
            document.body.innerHTML = fixedBodyContent;
        }

        // Second pass: look for the specific problematic pattern in display math
        const displayMathElements = document.querySelectorAll('script[type="math/tex; mode=display"]');
        displayMathElements.forEach(function(element) {
            if (element.textContent.includes('\\begin{') && element.textContent.includes('\\end{')) {
                let content = element.textContent;
                // Fix the matrix pattern in the MathJax script
                content = content.replace(/\\begin{(pmatrix|bmatrix|vmatrix|Vmatrix)}([^]*?)\\end{\1}/g, function(match, envType, matrixContent) {
                    matrixContent = matrixContent.replace(/(\s+)\\(\s+)/g, '$1\\\\$2');
                    return '\\begin{' + envType + '}' + matrixContent + '\\end{' + envType + '}';
                });
                element.textContent = content;
            }
        });
    }

    // Apply the fixes immediately
    fixCodeBlocks();
    fixLaTeXMatrices();

    // Also apply the fixes after highlight.js and MathJax run
    setTimeout(function() {
        fixCodeBlocks();
        fixLaTeXMatrices();
    }, 100);

    // Apply LaTeX fix after MathJax finishes processing
    setTimeout(function() {
        fixLaTeXMatrices();
        // Re-trigger MathJax processing if available
        if (typeof MathJax !== 'undefined') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
    }, 500);

    // Code block copy functionality
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(function(codeBlock) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.className = 'code-block-wrapper';

        const pre = codeBlock.parentNode;
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
        copyButton.title = 'Copy code';

        wrapper.appendChild(copyButton);

        copyButton.addEventListener('click', function() {
            const text = codeBlock.textContent;

            navigator.clipboard.writeText(text).then(function() {
                copyButton.innerHTML = '<i class="bi bi-check"></i>';
                setTimeout(function() {
                    copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 2000);
            }).catch(function() {
                copyButton.innerHTML = '<i class="bi bi-x"></i>';
                setTimeout(function() {
                    copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 2000);
            });
        });

        // Handle hover effects for copy button
        wrapper.addEventListener('mouseenter', function() {
            copyButton.style.opacity = '1';
            copyButton.style.visibility = 'visible';
            copyButton.style.transform = 'translateY(0)';
        });

        wrapper.addEventListener('mouseleave', function() {
            copyButton.style.opacity = '0';
            copyButton.style.visibility = 'hidden';
            copyButton.style.transform = 'translateY(-5px)';
        });
    });
}); 