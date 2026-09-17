# 顧客管理システム

React + Spring Boot + MySQL を使用して作成した顧客管理システムです。

顧客情報の登録・検索・編集・削除を行うことができ、JWT認証によってユーザーのアクセスを管理しています。

## 概要

実際の顧客管理業務を想定し、顧客情報を一覧・詳細画面から管理できるWebアプリケーションとして開発しました。

フロントエンドにはReact、バックエンドにはSpring Bootを使用し、REST APIを介してデータを連携しています。

また、Spring SecurityとJWTを利用した認証機能を実装しています。

## 主な機能

### 認証・ユーザー管理

- ログイン機能
- ユーザー登録機能
- JWTによる認証
- Spring SecurityによるAPIアクセス制御
- BCryptによるパスワードハッシュ化
- ログインユーザー名の表示

### 顧客管理

- 顧客登録
- 顧客一覧表示
- 顧客検索
- 顧客詳細表示
- 顧客情報編集
- 顧客削除
- 担当スタッフの登録
- 名刺登録状況の管理
- メモの登録

### その他

- ReactとSpring Boot APIの連携
- MySQLによるデータ永続化
- レスポンシブな画面構成

## 使用技術

### Frontend

- React
- TypeScript
- Vite
- HTML / CSS
- Fetch API
- async / await

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Gradle

### Database

- MySQL

### 開発環境

- macOS
- Visual Studio Code
- Git / GitHub

## システム構成

```text
React + TypeScript
        │
        │ HTTP / REST API
        ▼
Spring Boot
        │
        ├── Spring Security
        ├── JWT認証
        └── Spring Data JPA
                │
                ▼
              MySQL
```

## 認証の流れ

```text
1. Reactからログイン情報を送信
        ↓
2. Spring Bootでユーザー認証
        ↓
3. JWTを発行
        ↓
4. ReactでJWTを保存
        ↓
5. APIリクエスト時にAuthorizationヘッダーへJWTを付与
        ↓
6. Spring SecurityでJWTを検証
        ↓
7. 認証済みユーザーとしてAPIを利用
```

## 画面

- ログイン
- メインメニュー
- 顧客一覧
- 顧客登録
- 顧客詳細
- 顧客編集
- ユーザー登録
- スケジュール

## 起動方法

### Backend

プロジェクトのルートディレクトリで以下を実行します。

```bash
./gradlew bootRun
```

### Frontend

`frontend` ディレクトリへ移動して実行します。

```bash
cd frontend
npm install
npm run dev
```

## 環境変数

データベース接続情報やJWT秘密鍵などの機密情報は、環境変数から読み込む構成にしています。

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
FRONTEND_URL
```

機密情報はGitHubへ直接公開しないようにしています。

## GitHub

このリポジトリでは、ReactによるフロントエンドとSpring Bootによるバックエンドを一つのプロジェクトとして管理しています。