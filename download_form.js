const fs = require('fs');
const https = require('https');

https.get('https://ui.shadcn.com/r/styles/default/form.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.files && json.files.length > 0) {
        fs.writeFileSync('src/components/ui/form.tsx', json.files[0].content);
        console.log('Successfully wrote form.tsx');
      } else {
        console.log('No files found in JSON');
      }
    } catch (e) {
      console.log('Error parsing JSON:', e);
    }
  });
});
