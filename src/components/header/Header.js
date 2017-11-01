import React from 'react';

import I18N from '../../i18n';

const Header = () => (
  <section className="hero is-info">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          { I18N.headerTitle }
        </h1>
      </div>
    </div>
  </section>
);

export default Header;