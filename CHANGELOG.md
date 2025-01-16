# 0.2.0 (17-01-2025)

- **breaking:** Memoize processor for performance optimization, options are now immutable.
- **perf:** Reduced unnecessary recomputations by memoizing the processor in `useRemark` hook.

## 0.1.3 (26-12-2024)

- **feat:** Return processed `reactContent` immediately on the first render instead of initializing with `null` in the `useRemark` hook and `<Remark>` component.
