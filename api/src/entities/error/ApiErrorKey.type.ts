export type ApiErrorKey =
    // SQL
    | 'sql/failed'
    | 'sql/not-found'

    // Crud
    | 'validation/failed'

    // Authorization
    | 'auth/missing-email'
    | 'auth/email-already-exists'
    | 'auth/unknown-email'
    | 'auth/missing-header'
    | 'auth/invalid-password'
    | 'auth/access-token-expired'
    | 'auth/invalid-access-token'
    | 'auth/insufficient-role'
    | 'auth/invalid-security-name'
    | 'auth/invalid-role'

    // Fichiers
    | 'object/invalid-multipart'
    | 'object/invalid-response'
    | 'object/key-not-found-in-storage'
    | 'storage/failed-to-upload'

    // Advertising
    | 'advertiser/insufficient-credit'

    // Default
    | 'internal/unknown'

    // Garment
    | 'garment/invalid-category'
    | 'garment/invalid-sub-category'
    | 'garment/not-found'
    | 'garment/unauthorized-action'

    // Image
    | 'image/upload-failed'

    // Outfit
    | 'outfit/invalid'
    | 'outfit/not-found'
    | 'outfit/unauthorized-action'
    | 'outfit/no-data-to-update'

    // OutfitPlan
    | 'outfit-plan/not-found'
    | 'outfit-plan/unauthorized-action'
    | 'outfit-plan/invalid-date'

    // User
    | 'user/not-found'
    | 'user/password-same-as-old';
