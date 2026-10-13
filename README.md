# B23DCCC004 - LTWNC - Thuc hanh 2

Student Deadline Tracker, nang cap tu bai thuc hanh 1.

## Chay

```bash
npm install
npm run dev
npm test
```

## Phan A

- **Ghim bai tap (Zustand)**: `src/store/usePinStore.ts` gom `pinnedIds`, `togglePin`, `isPinned`.
  Bai da ghim duoc day len dau danh sach. Khong dua vao Redux vi chi la state giao dien.
- **Theme sang/toi (Context)**: `src/contexts/ThemeContext.tsx`, value boc `useMemo`.
  `App` khong goi `useTheme()` de khoi re-render ca cay, class theme dat trong `ThemeProvider`.
- **Redux middleware**: them `redux-logger`, dung dynamic import trong `if (isDev)` nen ban
  production khong dinh logger (bundle 200 kB -> 177 kB).

## Phan B

Nut "Tao 10.000 bai tap mau" de stress test. 4 ky thuat toi uu:

1. `React.memo` cho `AssignmentCard` + `useCallback` cho cac handler.
2. `useDebounce` 300ms cho o tim kiem + `useMemo` cho phan loc.
3. `react-window` de ao hoa danh sach 10.000 bai.
4. `React.lazy` + `Suspense` cho trang Thong ke.

### Truoc / sau khi toi uu

| | Truoc | Sau |
|---|---|---|
| So lan render `AssignmentCard` khi go 5 ky tu | ... | ... |
| Thoi gian commit 1 lan go | ... | ... |
| Lighthouse Performance | ... | ... |

> Chay `npm run build && npm run preview` roi do bang Profiler va Lighthouse de dien vao bang.
> Anh chup de trong thu muc `docs/`.

## Phan C

Jest + ts-jest + React Testing Library, `coverageThreshold` 70% trong `jest.config.ts`.

| Loai | So test |
|---|---|
| Unit (utils, reducer) | 22 |
| Component (RTL + userEvent) | 10 |
| Bat dong bo (API mock) | 3 |
| Hook (fake timers) | 3 |
| Khac (store, memo, logger, stats) | 8 |

Tong 46 test, coverage `features/` dat **96.89%** statements.
