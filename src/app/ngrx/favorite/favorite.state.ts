export interface FavoriteState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialFavoriteState: FavoriteState = {
  loading: false,
  error: null,
  success: false,
};
