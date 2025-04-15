<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Sitemap XML - Bombardino Universe</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            background: #f5f5f5;
            font-size: 14px;
            line-height: 1.5;
          }
          #content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background: #1a1a1a;
            color: #fff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #f8f9fa;
            padding: 12px;
            text-align: left;
            font-weight: 500;
            color: #666;
            border-bottom: 2px solid #dee2e6;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
            color: #333;
          }
          tr:hover td {
            background: #f8f9fa;
          }
          .url {
            color: #0066cc;
            text-decoration: none;
          }
          .url:hover {
            text-decoration: underline;
          }
          .priority {
            text-align: center;
          }
          .changefreq {
            text-align: center;
          }
          .lastmod {
            text-align: center;
            white-space: nowrap;
          }
          .stats {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 4px;
            font-size: 13px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div id="content">
          <div class="header">
            <h1>Sitemap XML - Bombardino Universe</h1>
          </div>
          <table>
            <tr>
              <th>URL</th>
              <th>Última modificación</th>
              <th>Frecuencia</th>
              <th>Prioridad</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a class="url" href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td class="lastmod">
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
                <td class="changefreq">
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td class="priority">
                  <xsl:value-of select="sitemap:priority"/>
                </td>
              </tr>
            </xsl:for-each>
          </table>
          <div class="stats">
            <p>
              Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
            </p>
            <p>
              Última actualización del sitemap: <xsl:value-of select="format-date(current-date(), '[D01]/[M01]/[Y0001]')"/>
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 