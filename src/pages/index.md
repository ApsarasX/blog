---
title: 首页
hide_table_of_contents: true
---

```jsx live
function Clock(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  return (
    <div>
      <h2>你好，世界，现在时间是{date.toLocaleString()}</h2>
    </div>
  );
}
```