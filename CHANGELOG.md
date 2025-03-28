# 0.3.0 (28-03-2025)

- **feat:** Added `components` prop to customize Markdown-rendered elements.
- **refactor:** Replaced `ReactElement` with `JSX.Element` for better type consistency.
- **fix:** Improved error handling by using `tryCatch` utility in `useRemark`.

## 0.2.0 (17-01-2025)

- **breaking:** Memoize processor for performance optimization, options are now immutable.
- **perf:** Reduced unnecessary recomputations by memoizing the processor in `useRemark` hook.

## 0.1.3 (26-12-2024)

- **feat:** Return processed `reactContent` immediately on the first render instead of initializing with `null` in the `useRemark` hook and `<Remark>` component.
