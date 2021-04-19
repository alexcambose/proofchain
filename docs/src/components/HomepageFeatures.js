import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Decentralized',
    Svg: require('../../static/img/undraw_connected_world_wuay.svg').default,
    description: (
      <>
        Proofchain uses blockchain to store and manage data. Blockchain is a
        system of recording information in a way that makes it difficult or
        impossible to change, hack, or cheat the system.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('../../static/img/undraw_usability_testing_2xs4.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily integrated in
        your existing supply chain management software.
      </>
    ),
  },
  {
    title: 'Powered by Ethereum',
    Svg: require('../../static/img/undraw_ethereum_desire_wy1b.svg').default,
    description: (
      <>
        At the core, proochain uses smart contracts to manage traceability.
        These smart contracts are running on the Ethereum - EVM plafrom.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
