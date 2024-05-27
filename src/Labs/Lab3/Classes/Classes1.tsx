import './Classes.css';
export default function Classes1() {
    const color = 'blue';
    return (
      <div id="wd-classes">
        <h2>Classes</h2>
        <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
          Dynamic Blue background
        </div> 
      </div> 
    );
}