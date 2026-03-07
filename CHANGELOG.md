# Changelog

## [0.8.4](https://github.com/SahilAggarwal2004/react-remarkify/compare/v0.8.3...v0.8.4) (2026-03-07)

### Chores

* **deps:** Update tsdown.  ([6b0d48d](https://github.com/SahilAggarwal2004/react-remarkify/commit/6b0d48d228994563767658e4a533c6a42bdaedbe))

## [0.8.3](https://github.com/SahilAggarwal2004/react-remarkify/compare/v0.8.2...v0.8.3) (2026-02-21)

### Chores

* Rename `index.tsx` to `index.ts`.  ([ac66921](https://github.com/SahilAggarwal2004/react-remarkify/commit/ac66921535070cf43e1b0a42d7f5eb0cdb96378b))

### Build System

* Migrate from tsup to tsdown for library bundling.  ([6dadddc](https://github.com/SahilAggarwal2004/react-remarkify/commit/6dadddce97a2aa1fbdfbda027cd663366dab9619))

## [0.8.2](https://github.com/SahilAggarwal2004/react-remarkify/compare/v0.8.1...v0.8.2) (2026-01-04)

### Chores

* Add release-it for automated versioning and changelog.  ([a428ffc](https://github.com/SahilAggarwal2004/react-remarkify/commit/a428ffca6e4ce1bd553d6b792b88e68335efbd7f))

### Code Refactoring

* Modularize `index.tsx`.  ([0bf286a](https://github.com/SahilAggarwal2004/react-remarkify/commit/0bf286af8e662de4bb7a015e464842f6f65b159a))

### Build System

* Configure tsup for package bundling.  ([aaf6437](https://github.com/SahilAggarwal2004/react-remarkify/commit/aaf6437c210a95f5130b786a8b3aea620b39d228))
* Mark package as side effect free.  ([2943845](https://github.com/SahilAggarwal2004/react-remarkify/commit/2943845c378d2b31f147073808f8028aa14405a3))

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
