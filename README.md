# use-composition-input

> The `onChange` should not emit before composition end

```typescript
function Demo() {
  const callbacks = useCompositionInput((e) => {
    console.log(e);
  }, []);
  return <input {...callbacks} />;
}
```
