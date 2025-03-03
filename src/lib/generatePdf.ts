/**
 * Function to export HTML content as PDF using server-side rendering
 * @param {string} htmlContent - The HTML content to convert to PDF
 * @param {string} filename - The name of the downloaded file (default: 'exported-content.pdf')
 * @returns {Promise<boolean>} - Returns true if successful
 */
const exportContentAsPdf = async (htmlContent, filename = 'exported-content.pdf') => {
    try {
      
      // Ensure we have content to export
      if (!htmlContent) {
        throw new Error('No HTML content provided');
      }
      
      
      // Explicitly set method to POST and include proper headers
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf',
        },
        body: JSON.stringify({ htmlContent }),
      });
  
      
      // Handle errors with better debugging
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        
        // Try to parse error details from response
        try {
          const errorData = await response.json();
          errorMessage = `Server error: ${errorData.error || errorData.message || response.statusText}`;
          console.error('Error details:', errorData);
        } catch (e) {
          // If we can't parse JSON, use the status text
          console.error('Could not parse error response');
        }
        
        throw new Error(errorMessage);
      }
  
      // Get the content type to verify it's actually a PDF
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        console.warn('Unexpected content type:', contentType);
      }
      
      // Get the PDF as a blob
      const blob = await response.blob();
      
      
      if (blob.size === 0) {
        throw new Error('Received empty PDF data');
      }
  
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      
      
      // Trigger download
      a.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        a.remove();
      }, 100);
      
      return true;
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  };
  
  export default exportContentAsPdf;