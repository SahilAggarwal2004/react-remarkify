## 0.8.0 (2025-12-15)

* **feat:** Add `stableMarkdown` option to `useRemark` hook to skip expensive internal key calculation when the `markdown` input is already stable (memoized), improving performance.
* **fix:** Correct typo `udpateMode` → `updateMode` in `useRemark` hook options.

## 0.7.0 (2025-11-01)

* **fix:** Ensure `throttle` mode in `useStableValue` performs a trailing update to prevent missing the final value update.

## 0.6.4 (2025-10-11)

* **breaking:** Make `useRemark` hook and `<Remark>` component props immutable for performance.

## 0.6.0 (2025-10-11)

* **breaking:** Replace `debounceDelay` with `updateMode` and `updateDelay` in `useRemark` hook and `<Remark>` component.

## 0.5.2 (2025-10-11)

* **fix:** Ensure useDebounce follows React rules of hooks
* **fix:** Debounce key instead of text in useSpeechInternal to prevent starvation
* **fix:** Use stable keys (index fallback) in processReactNode instead of random values

## 0.5.0 (2025-10-11)

* **feat:** Add `debounceDelay` option to `useRemark` hook and `<Remark>` component to debounce changes to the `markdown` input, reducing redundant processing during rapid updates.

## 0.4.0 (2025-07-01)

* **feat:** Support `ReactNode` as input for `markdown` prop (accepts strings, JSX, fragments, etc.).
* **perf:** Prevent unnecessary reprocessing.

## 0.3.0 (2025-03-28)

* **feat:** Added `components` prop to customize Markdown-rendered elements.
* **refactor:** Replaced `ReactElement` with `JSX.Element` for better type consistency.
* **fix:** Improved error handling by using `tryCatch` utility in `useRemark`.

## 0.2.0 (2025-01-17)

* **breaking:** Memoize processor for performance optimization, options are now immutable.
* **perf:** Reduced unnecessary recomputations by memoizing the processor in `useRemark` hook.

## 0.1.3 (2024-12-26)

* **feat:** Return processed `reactContent` immediately on the first render instead of initializing with `null` in the `useRemark` hook and `<Remark>` component.
