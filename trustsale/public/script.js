(function(global, configKey) {
    console.log("Script initialized with configKey:", configKey);

    global[configKey] = global[configKey] || function(config) {
        console.log("customConfig called with:", config);
        (global[configKey].q = global[configKey].q || []).push(config);
        processQueue();
    };

    // Default configuration
    const defaultConfig = {
        siteId: 'defaultSiteId',
        popupText: 'Welcome to our site!',
        popupColor: '#ffffff',
        popupCorner: 'top-right'
    };

    // Function to track visitors
    function trackVisitor(config) {
        console.log("Tracking visitor with config:", config);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://eo5yzla6isyvxnm.m.pipedream.net', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            siteId: config.siteId || 'unknown'
        }));
    }

    // Function to manipulate the DOM
    function manipulateDOM(config) {
        console.log("Manipulating DOM with config:", config);
        // Create a shadow DOM to encapsulate styles (optional)
        var shadowHost = document.createElement('div');
        shadowHost.id = 'custom-popup-host';
        shadowHost.style.position = 'fixed';
    
        var slideDirection;
        switch (config.popupCorner) {
            case 'top-left':
                shadowHost.style.top = '10px';
                shadowHost.style.left = '10px';
                slideDirection = 'down';
                break;
            case 'top-right':
                shadowHost.style.top = '10px';
                shadowHost.style.right = '10px';
                slideDirection = 'down';
                break;
            case 'bottom-left':
                shadowHost.style.bottom = '10px';
                shadowHost.style.left = '10px';
                slideDirection = 'up';
                break;
            case 'bottom-right':
            default:
                shadowHost.style.bottom = '10px';
                shadowHost.style.right = '10px';
                slideDirection = 'up';
                break;
        }
    
        shadowHost.style.width = '300px';
        shadowHost.style.height = '100px';
        shadowHost.style.zIndex = '1000';
        document.body.appendChild(shadowHost);
    
        var shadow = shadowHost.attachShadow({ mode: 'open' });
    
        // Add styles
        var style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
    
            @keyframes slideDown {
                from { transform: translateY(-100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
    
            #custom-popup {
                position: relative;
                padding: 10px;
                background-color: ${config.popupColor};
                box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                font-family: Arial, sans-serif;
                animation: ${slideDirection === 'up' ? 'slideUp' : 'slideDown'} 0.5s ease-out forwards;
                height: 75px; /* Fixed height */
                overflow: hidden; /* Prevent content overflow */
            }
            #custom-popup p {
                margin: 0;
                font-size: 18px;
            }
            .close-button {
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                color: #007bff;
                font-size: 14px;
            }
            .close-button:hover {
                text-decoration: underline;
            }
        `;
        shadow.appendChild(style);
    
        // Add popup content
        var popup = document.createElement('div');
        popup.id = 'custom-popup';
        popup.innerHTML = `
            <p>${config.popupText || 'This is a custom popup'}</p>
            <span class="close-button">&times;</span>
        `;
        shadow.appendChild(popup);
    
        // Make the popup slide into view
        setTimeout(function() {
            console.log("Sliding popup into view");
            if (slideDirection === 'up') {
                shadowHost.style.bottom = '10px'; // Slide up to 10px from bottom
            } else {
                shadowHost.style.top = '10px'; // Slide down to 10px from top
            }
        }, 100); // Delay for 100ms for smooth animation
    
        // Add close button functionality
        popup.querySelector('.close-button').addEventListener('click', function() {
            console.log("Popup close button clicked");
            if (slideDirection === 'up') {
                shadowHost.style.bottom = '-100%'; // Slide down out of view
            } else {
                shadowHost.style.top = '-100%'; // Slide up out of view
            }
            setTimeout(function() {
                shadowHost.remove();
                console.log("Popup removed from DOM");
            }, 500); // Remove after animation completes (0.5s)
        });
    }

    // Function to process the queue of configurations
    function processQueue() {
        console.log("Processing queue");
        var queue = global[configKey].q || [];
        for (var i = 0; i < queue.length; i++) {
            var config = queue[i];
            console.log("Processing config:", config);

            // Extract the actual configuration object if wrapped in an Arguments object
            if (config[0]) {
                config = config[0];
            }

            // Merge the provided config with the default config
            config = { ...defaultConfig, ...config };

            trackVisitor(config);
            manipulateDOM(config);
        }
        global[configKey].q = []; // Clear the queue after processing
    }

    // Check if the script is loaded
    if (document.readyState === 'complete') {
        console.log("Document ready, processing queue");
        processQueue();
    } else {
        global.addEventListener('load', function() {
            console.log("Window load event, processing queue");
            processQueue();
        });
    }
})(window, 'customConfig');