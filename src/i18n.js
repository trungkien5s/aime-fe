// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Sign In Page
            'Sign In': 'Sign In',
            'Username': 'Username',
            'Password': 'Password',
            'Remember me': 'Remember me',
            'Forgot password?': 'Forgot password?',
            'Signing in...': 'Signing in...',
            'Enter your username': 'Enter your username',
            'Enter your password': 'Enter your password',
            'Username or email is required': 'Username or email is required',
            'Password is required': 'Password is required',
            'Invalid login credentials.': 'Invalid login credentials.',
            'Unable to connect to server. Please try again.': 'Unable to connect to server. Please try again.',

            // Auth Layout
            'Welcome to AimeMask': 'Welcome to AimeMask',
            'Home': 'Home',
            'Product': 'Product',
            'Service': 'Service',
            'Contact': 'Contact',
            'Help': 'Help',
            'About Us': 'About Us',

            // Inside en.translation
            'Processing Options': 'Processing Options',
            'Enable Debug Mode': 'Enable Debug Mode',
            'START MASKING': 'START MASKING',
            'Upload a file to start': 'Upload a file to start',
            'Please upload a file before processing': 'Please upload a file before processing',
            // Common
            'An error occurred.': 'An error occurred.',
            'Loading...': 'Loading...',


            // Entity labels
            'location': 'Location',
            'email': 'Email',
            'age': 'Age',
            'money': 'Money',
            'phone': 'Phone',
            'time': 'Time',
            'facility': 'Facility',
            'address': 'Address',
            'postal_address': 'Postal Address',
            'credit Card': 'Credit Card',
            'url': 'URL',
            'ogranization': 'Organization',
            'person': 'Person',
            'entity Configuration': 'Entity Configuration',


// EntityCard
            'Masking Type': 'Masking Type',
            'Substitute Character': 'Substitute Character',
            'Enter substitute': 'Enter substitute',
            'Mask all characters': 'Mask all characters',
            'Mask partially': 'Mask partially',
            'No masking': 'No masking',

// FileUpload & Whitelist
            'File Upload': 'File Upload',
            'Drag and drop your file here, or click to browse': 'Drag and drop your file here, or click to browse',
            'Supported formats': 'Supported formats',
            'You must be logged in.': 'You must be logged in.',
            'Whitelist Configuration': 'Whitelist Configuration',
            'Upload a whitelist file (.txt) to specify terms that should not be masked': 'Upload a whitelist file (.txt) to specify terms that should not be masked',
            'Choose whitelist file': 'Choose whitelist file',
            'Whitelist file loaded': 'Whitelist file loaded',

            // Header & Footer
            "Log out": "Log out",
            "Profile": "Profile",
            "Settings": "Settings",
            "Premium Member": "Premium Member",
            "Logout successful!": "Logout successful!",
            "You have been logged out successfully!": "You have been logged out successfully!",
            "An error occurred during logout. Please try again.": "An error occurred during logout. Please try again.",

            "File Encryption": "File Encryption",
            "Security API": "Security API",
            "AI Monitoring": "AI Monitoring",

            "Company": "Company",
            "Careers": "Careers",
            "Blog": "Blog",

            "Support": "Support",
            "Documentation": "Documentation",
            "System Status": "System Status",

            "Copyright © 2018 - 2025 Aimesoft. All rights reserved.": "Copyright © 2018 - 2025 Aimesoft. All rights reserved.",



            // Sign Up Page
            'Sign Up': 'Sign Up',
            'Create Account': 'Create Account',
            'Confirm Password': 'Confirm Password',
            'Re-enter your password': 'Re-enter your password',
            'Registering...': 'Registering...',
            'I agree to the': 'I agree to the',
            'Terms of Service': 'Terms of Service',
            'Privacy Policy': 'Privacy Policy',
            'Please agree to the terms of service': 'Please agree to the terms of service',
            'Already have an account?': 'Already have an account?',
            'Sign in now': 'Sign in now',

            "mask_all_character": "Mask all characters",
            "mask_character": "Mask character",
            "mask_n_last_characters": "Mask last N characters",
            "mask_n_first_characters": "Mask first N characters",
            "word_sampling": "Word sampling",
            "mask_email": "Mask email",
            "mask_number": "Mask number" ,
            "mask_user_email": "Mask email username",
            "fake_number": "Fake number",
            "mask_phone": "Mask phone number",
            "fake_phone": "Fake phone number",
            "fake_date": "Fake date",
            "mask_address": "Mask address",
            "mask_postal_address": "Mask postal address",
            "fake_postal_address": "Fake postal address",
            "mask_url": "Mask URL",

        }
        },
        ja: {
            translation: {
                // Sign In Page
                'Sign In': 'ログイン',
                'Username': 'ユーザー名',
                'Password': 'パスワード',
                'Remember me': 'ログイン状態を保持',
                'Forgot password?': 'パスワードを忘れましたか？',
                'Signing in...': 'ログイン中...',
                'Enter your username': 'ユーザー名を入力してください',
                'Enter your password': 'パスワードを入力してください',
                'Username or email is required': 'ユーザー名またはメールアドレスが必要です',
                'Password is required': 'パスワードが必要です',
                'Invalid login credentials.': 'ログイン情報が正しくありません。',
                'Unable to connect to server. Please try again.': 'サーバーに接続できません。再度お試しください。',

                // Auth Layout
                'Welcome to AimeMask': 'AimeMaskへようこそ',
                'Home': 'ホーム',
                'Product': '製品',
                'Service': 'サービス',
                'Contact': 'お問い合わせ',
                'Help': 'ヘルプ',
                'About Us': '私たちについて',

                // Inside ja.translation
                'Processing Options': '処理オプション',
                'Enable Debug Mode': 'デバッグモードを有効にする',
                'START MASKING': 'マスキングを開始',
                'Upload a file to start': 'ファイルをアップロードして開始',
                'Please upload a file before processing': '処理を始める前にファイルをアップロードしてください',

                // Common
                'An error occurred.': 'エラーが発生しました。',
                'Loading...': '読み込み中...',

                'location': '場所',
                'email': 'メール',
                'age': '年齢',
                'money': '金額',
                'phone': '電話',
                'time': '時間',
                'facility': '施設',
                'address': '住所',
                'postal_address': '郵便住所',
                'credit card': 'クレジットカード',
                'url': 'URL',
                'ogranization': '組織',
                'person': '人物',
                'Entity Configuration': 'エンティティ構成',


                'Masking Type': 'マスキングタイプ',
                'Substitute Character': '置換文字',
                'Enter substitute': '置換文字を入力してください',
                'Mask all characters': 'すべての文字をマスク',
                'Mask partially': '一部をマスク',
                'No masking': 'マスクしない',

                'File Upload': 'ファイルアップロード',
                'Drag and drop your file here, or click to browse': 'ここにファイルをドラッグ＆ドロップ、またはクリックして選択',
                'Supported formats': '対応形式',
                'You must be logged in.': 'ログインが必要です。',
                'Whitelist Configuration': 'ホワイトリスト設定',
                'Upload a whitelist file (.txt) to specify terms that should not be masked': 'マスキングされない単語を指定するホワイトリスト(.txt)ファイルをアップロードしてください',
                'Choose whitelist file': 'ホワイトリストファイルを選択',
                'Whitelist file loaded': '読み込まれたファイル',

                "Log out": "ログアウト",
                "Profile": "プロフィール",
                "Settings": "設定",
                "Premium Member": "プレミアム会員",

                "Logout successful!": "ログアウトに成功しました！",
                "You have been logged out successfully!": "正常にログアウトされました！",
                "An error occurred during logout. Please try again.": "ログアウト中にエラーが発生しました。もう一度お試しください。",

                "File Encryption": "ファイル暗号化",
                "Security API": "セキュリティAPI",
                "AI Monitoring": "AIモニタリング",

                "Company": "会社",
                "Careers": "採用情報",
                "Blog": "ブログ",

                "Support": "サポート",
                "Documentation": "ドキュメント",
                "System Status": "システム状況",

                // Sign Up Page
                'Sign Up': 'サインアップ',
                'Create Account': 'アカウントを作成',

                'Confirm Password': 'パスワードを確認',
                'Re-enter your password': 'パスワードを再入力してください',
                'Registering...': '登録中...',
                'I agree to the': '以下に同意します：',
                'Terms of Service': '利用規約',
                'Privacy Policy': 'プライバシーポリシー',
                'Please agree to the terms of service': '利用規約に同意してください',
                'Already have an account?': 'すでにアカウントをお持ちですか？',
                'Sign in now': '今すぐサインイン',



    "Please ensure your file is not password protected": "ファイルにパスワードが設定されていないことを確認してください",
    "File Requirements": "ファイル要件",
    "Maximum file size": "最大ファイルサイズ",
    "None": "なし",

                "Processing...": "処理中...",
                "Processing your file, please wait...": "ファイルを処理しています。お待ちください...",
                "This may take a few moments depending on file size": "ファイルのサイズによっては少し時間がかかる場合があります",


"and": "と",
                "Copyright © 2018 - 2025 Aimesoft. All rights reserved.": "Copyright © 2018 - 2025 Aimesoft。無断転載を禁じます。",

                "Username is required": "ユーザー名は必須です",

    "Confirm password is required": "パスワードの確認は必須です",
    "Passwords do not match": "パスワードが一致しません",
    "Password must be at least 6 characters": "パスワードは6文字以上である必要があります",
    "Password must contain at least one uppercase letter": "パスワードには1つ以上の大文字を含めてください",
    "Password must contain at least one lowercase letter": "パスワードには1つ以上の小文字を含めてください",
    "Password must contain at least one number": "パスワードには1つ以上の数字を含めてください",
    "Password must contain at least one special character": "パスワードには1つ以上の特殊文字を含めてください",
    "Very Weak": "とても弱い",
    "Weak": "弱い",
    "Fair": "普通",
    "Strong": "強い",
    "Very Strong": "とても強い",
    "An error occurred during registration. Please try again.": "登録中にエラーが発生しました。もう一度お試しください。",
    "Registration failed. Please try again.": "登録に失敗しました。もう一度お試しください。",
    "Cannot connect to the server. Please check your network and try again.": "サーバーに接続できません。ネットワークを確認して再試行してください。",
    "An unknown error occurred. Please try again.": "不明なエラーが発生しました。もう一度お試しください。",


                // Operators
                "mask_all_character": "すべての文字をマスク",
                "mask_character": "文字をマスク",
                "mask_n_last_characters": "最後のN文字をマスク",
                "mask_n_first_characters": "最初のN文字をマスク",
                "word_sampling": "単語サンプリング",
                "mask_email": "メールアドレスをマスク",
                "mask_user_email": "メールユーザー名をマスク",
                "fake_number": "偽の数値に置き換える",
                "mask_phone": "電話番号をマスク",
                "fake_phone": "偽の電話番号に置き換える",
                "fake_date": "偽の日付に置き換える",
                "mask_address": "住所をマスク",
                "mask_postal_address": "郵便住所をマスク",
                "fake_postal_address": "偽の郵便住所に置き換える",
                "mask_url": "URLをマスク",
                "mask_number": "数値をマスク",


                "You have selected many entities which may cause overlapping issues. Do you want to continue?":"多数のエンティティを選択しているため、重複の問題が発生する可能性があります。続行しますか？",



            }
        },
};i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',

        // 💡 Sử dụng detector và lưu đúng key
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            lookupLocalStorage: 'preferred-language',
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false, // React already escapes by default
        },

        react: {
            useSuspense: false,
        },
    });

export default i18n;