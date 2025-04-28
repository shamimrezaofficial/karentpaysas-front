import { useEffect } from 'react';

function DynamicChatCode({liveChat}) {
    useEffect(() => {
        setTimeout(() => {
          const container = window.document.getElementById('chat_code_container_div');    
          if (!container) return;    
          const scripts = container.querySelectorAll('script');
          scripts.forEach((script) => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            window.document.body.appendChild(newScript);
            script.remove();
          });
        }, 500);
      }, [liveChat]);
    
      return (
        <div
          id='chat_code_container_div'
          dangerouslySetInnerHTML={{
            __html: String(liveChat) || ''
          }}
        />
      );
}

export default DynamicChatCode;