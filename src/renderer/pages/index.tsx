import React, {useEffect, useRef} from 'react';
import {remote} from 'electron';
import styles from './style.module.scss';

const Cmp = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenSize = remote.screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = ref.current?.offsetWidth ?? 800;
    remote.getCurrentWindow().setSize(
      windowWidth,
      screenSize.height,
      true
    );
  }, [ref.current?.offsetWidth]);

  return (
    <div style={{width: '1000px', backgroundColor: 'palevioletred'}} ref={ref}>
      <h1 className={styles.common}>
        Hi from a react appsdf
        {remote.screen.getPrimaryDisplay().workAreaSize.width}
      </h1>
    </div>
  );
}

export default Cmp;
