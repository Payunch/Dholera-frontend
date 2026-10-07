async function test() {
  const res = await fetch('https://www.dholeraplatform.com/blogs/dholera-plot-registration-process', {
    headers: {
      'Cache-Control': 'no-cache'
    }
  });
  const html = await res.text();
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  console.log("H1:", h1Match ? h1Match[1] : "No H1 found");
  
  const emailInputMatch = html.includes('placeholder="you@example.com"');
  console.log("Email Input found:", emailInputMatch);
}
test();
