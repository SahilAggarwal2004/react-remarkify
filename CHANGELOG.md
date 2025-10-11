# 0.6.4 (11-10-2025)

- **breaking:** Make `useRemark` hook and `<Remark>` component props immutable for performance.

## 0.6.0 (11-10-2025)

- **breaking:** Replace `debounceDelay` with `updateMode` and `updateDelay` in `useRemark` hook and `<Remark>` component.

## 0.5.2 (11-10-2025)

- **fix:** Ensure useDebounce follows React rules of hooks
- **fix:** Debounce key instead of text in useSpeechInternal to prevent starvation
- **fix:** Use stable keys (index fallback) in processReactNode instead of random values

## 0.5.0 (11-10-2025)

- **feat:** Add `debounceDelay` option to `useRemark` hook and `<Remark>` component to debounce changes to the `markdown` input, reducing redundant processing during rapid updates.

## 0.4.0 (01-07-2025)

- **feat:** Support `ReactNode` as input for `markdown` prop (accepts strings, JSX, fragments, etc.).
- **perf:** Prevent unnecessary reprocessing.

## 0.3.0 (28-03-2025)

- **feat:** Added `components` prop to customize Markdown-rendered elements.
- **refactor:** Replaced `ReactElement` with `JSX.Element` for better type consistency.
- **fix:** Improved error handling by using `tryCatch` utility in `useRemark`.

## 0.2.0 (17-01-2025)

- **breaking:** Memoize processor for performance optimization, options are now immutable.
- **perf:** Reduced unnecessary recomputations by memoizing the processor in `useRemark` hook.

## 0.1.3 (26-12-2024)

- **feat:** Return processed `reactContent` immediately on the first render instead of initializing with `null` in the `useRemark` hook and `<Remark>` component.
