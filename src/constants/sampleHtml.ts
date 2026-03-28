export const SAMPLE_HTML = `<h1>Heading</h1>
<p>
  This includes <strong>bold</strong>, <em>italic</em>, and <code>inline code</code>.
</p>
<ul>
  <li>Unordered item one</li>
  <li>Unordered item two</li>
</ul>
<ol>
  <li>Ordered item one</li>
  <li>Ordered item two</li>
</ol>
<p>
  Visit <a href="https://example.com">Example</a> for more details.
</p>
<p>
  <img
    src="https://picsum.photos/100"
    alt="Sample image"
  />
</p>
<blockquote>
  <p>Conversion should preserve semantic meaning.</p>
</blockquote>
<pre><code class="language-ts">const greeting = "Hello";
console.log(greeting);
</code></pre>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sanitization</td>
      <td>Required</td>
    </tr>
    <tr>
      <td>Determinism</td>
      <td>Required</td>
    </tr>
  </tbody>
</table>
<hr />
<ul>
  <li><input type="checkbox" checked /> Completed checklist item</li>
  <li><input type="checkbox" /> Pending checklist item</li>
</ul>
`;
