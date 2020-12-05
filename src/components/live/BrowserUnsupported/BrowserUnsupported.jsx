import React from 'react';

export default function BrowserUnsupported() {
  return (
    <p className="browser-unsupported">
      Looks like you need to upgrade your browser to make video calls.
      <br />
      See&nbsp;
      <a href="https://help.daily.co/en/articles/3179421-what-browser-version-does-daily-co-require">
        this page
      </a>
      &nbsp;for help getting on a supported browser version.
    </p>
  );
}
