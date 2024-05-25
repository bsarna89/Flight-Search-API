import { lazy, Suspense } from "react";

export function lazyLoadRoutes(componentName) {
  const LazyElement = lazy(() => import(`../views/${componentName}.js`));

  return (
    <Suspense>
      <LazyElement />
    </Suspense>
  );
}
