import './Classes.css';
export default function Classes2() {
    const color = 'blue';
    const dangerous = false;
    return (
      <div id="wd-classes">
        <h2>Classes</h2>
        <div className={`${dangerous ? 'wd-bg-red' : 'wd-bg-green'}
                                        wd-fg-black wd-padding-10px`}>
          Dangerous background
        </div>
        <hr/>
      </div>

    );
}