import { conceptSlug, fashionCategories, type FashionCategory } from './womenswearCatalog.ts';

export type EditView = {
  category: FashionCategory | 'all';
  showAll: boolean;
};

// Keep the editorial filters in the URL, not ephemeral component state, so
// someone returning from a concept page sees the same collection selection.
export function parseEditView(search: string): EditView {
  const params = new URLSearchParams(search);
  const category = fashionCategories.find((item) => item.id === params.get('category'))?.id ?? 'all';
  return {
    category,
    showAll: category === 'all' && params.get('view') === 'all',
  };
}

export function editViewSearch(view: EditView): string {
  const params = new URLSearchParams();
  if (view.category !== 'all') {
    params.set('category', view.category);
  } else if (view.showAll) {
    params.set('view', 'all');
  }
  const query = params.toString();
  return query ? '?' + query : '';
}

export function conceptLink(name: string, view: EditView): string {
  return '/edit/' + conceptSlug(name) + editViewSearch(view);
}

export function collectionReturnLink(search: string): string {
  return '/' + editViewSearch(parseEditView(search)) + '#edit';
}
