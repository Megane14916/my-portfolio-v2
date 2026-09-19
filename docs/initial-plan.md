# ポートフォリオサイト 簡易設計書

## 1. 概要

エンジニアとしての経歴、スキル、制作物をまとめるポートフォリオサイトを作成する。

Astroを使用し、コンテンツとUIを分離して管理する。
最初にページ構造・データ構造・ルーティングなどを実装し、その後UIデザインを作り込む。

---

## 2. 使用技術

* Astro
* TypeScript
* Markdown / MDX
* Tailwind CSS
* Astro Content Collections

必要に応じて以下を追加する。

* Iconify / Simple Icons
* View Transitions
* ReactなどのUI Framework

基本的にはAstroコンポーネントを使用し、クライアントJavaScriptは必要な箇所だけ使用する。

---

## 3. ページ構成

### `/`

トップページ。

サイト全体の概要を短く表示する。

主な内容：

* 名前
* エンジニアとしての短い紹介
* 主なスキル
* Featured Works
* Aboutへのリンク
* Worksへのリンク
* GitHubなど外部リンク

詳細情報をすべて載せるのではなく、各ページへの入口として使用する。

---

### `/about`

プロフィール・経歴・スキルを詳しく表示するページ。

主な内容：

* 自己紹介
* 経歴
* スキル
* 興味のある技術・分野

経歴は時系列で表示する。

例：

```text
2025.04 ───────── 現在
○○大学

2025.08
プログラミング学習開始

2026.08.21 ─ 2026.08.30
ハッカソン参加
```

---

### `/works`

制作物一覧ページ。

各作品をカード形式で表示する。

表示内容：

* サムネイル
* タイトル
* 短い説明
* 技術スタック
* 制作期間
* 詳細ページへのリンク

Featured Worksだけでなく、登録されている作品を一覧表示する。

---

### `/works/[slug]`

各作品の詳細ページ。

例：

```text
/works/netatsui-grandprix
/works/walk-city
/works/life-timeline
```

表示内容：

* タイトル
* サムネイル
* 制作期間
* GitHub URL
* 公開URL
* 使用技術
* 概要
* 開発背景
* 担当範囲
* 技術構成
* 工夫した点
* 苦労した点
* 改善内容
* スクリーンショット

本文はMarkdown / MDXで管理する。

---

# 4. ディレクトリ構成

```text
src/
├─ assets/
│  ├─ profile/
│  └─ works/
│
├─ components/
│  ├─ common/
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  └─ SectionTitle.astro
│  │
│  ├─ home/
│  │  ├─ Hero.astro
│  │  ├─ FeaturedWorks.astro
│  │  └─ SkillSummary.astro
│  │
│  ├─ about/
│  │  ├─ Profile.astro
│  │  ├─ Timeline.astro
│  │  └─ SkillList.astro
│  │
│  └─ works/
│     ├─ WorkCard.astro
│     ├─ WorkList.astro
│     └─ WorkHeader.astro
│
├─ content/
│  ├─ works/
│  │  ├─ netatsui-grandprix.md
│  │  ├─ walk-city.md
│  │  └─ life-timeline.md
│  │
│  └─ experiences/
│     ├─ university.md
│     ├─ programming-start.md
│     └─ hackathon.md
│
├─ data/
│  ├─ profile.ts
│  ├─ skills.ts
│  └─ links.ts
│
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ WorkLayout.astro
│
├─ pages/
│  ├─ index.astro
│  ├─ about.astro
│  └─ works/
│     ├─ index.astro
│     └─ [slug].astro
│
├─ styles/
│  ├─ global.css
│  └─ variables.css
│
└─ content.config.ts
```

---

# 5. データ設計

## Works

作品ごとにMarkdownファイルを作成する。

```text
src/content/works/
```

例：

```md
---
title: "Walk City"
slug: "walk-city"

start: "2026-08-21"
end: "2026-08-30"

description: "歩数を利用した街づくりWebアプリ"

skills:
  - react
  - typescript
  - supabase

github: "https://github.com/..."
website: "https://..."

featured: true

thumbnail: "../../assets/works/walk-city/thumbnail.webp"
---

## 概要

...

## 開発背景

...

## 担当範囲

...

## 工夫した点

...
```

Frontmatterには一覧表示や検索に使う構造化データを保存する。

本文には作品の詳しい説明をMarkdown形式で保存する。

---

# 6. Experience

経歴もMarkdownで管理する。

```text
src/content/experiences/
```

基本データ：

```yaml
title:
category:
start:
end:
organization:
skills:
```

期間は以下のルールとする。

```text
start < end
→ 期間

start = end
→ ある時点のイベント

endなし
→ 現在まで継続
```

例：

```md
---
title: "ハッカソン参加"
category: "hackathon"

start: "2026-08-21"
end: "2026-08-30"

skills:
  - react
  - typescript
  - supabase
---

「継続」をテーマとしたハッカソンに参加。

チームで歩数を利用した街づくりWebアプリを開発した。
```

---

# 7. Skills

スキルはTypeScriptでマスターデータとして管理する。

```text
src/data/skills.ts
```

例：

```ts
export const skills = [
  {
    id: "python",
    name: "Python",
    category: "language",
    proficiency: "confident",
  },

  {
    id: "flask",
    name: "Flask",
    category: "backend",
    proficiency: "practical",
  },

  {
    id: "react",
    name: "React",
    category: "frontend",
    proficiency: "practical",
  },
];
```

`id`をWorksやExperienceから参照する。

```yaml
skills:
  - react
  - typescript
  - supabase
```

これによりスキル名・アイコンなどを一か所で管理する。

---

# 8. Profile

基本的なプロフィール情報は、

```text
src/data/profile.ts
```

で管理する。

例：

```ts
export const profile = {
  name: "Megane14916",

  role: "Backend Engineer",

  introduction:
    "Webアプリケーション開発を中心に学習しています。",

  description:
    "バックエンドを中心に、フロントエンドやインフラも含めたWeb開発に取り組んでいます。",
};
```

---

# 9. 共通レイアウト

全ページで以下を共通化する。

```text
Header
↓
Main
↓
Footer
```

`BaseLayout.astro`を作成し、

```astro
<BaseLayout>
  ...
</BaseLayout>
```

として各ページから使用する。

Headerには、

```text
Home
About
Works
GitHub
```

程度を配置する。

---

# 10. 実装手順

## Phase 1：プロジェクト作成

Astroプロジェクトを作成する。

必要な最低限の設定を行う。

---

## Phase 2：データ構造作成

最初にUIを作らず、データ管理の仕組みを完成させる。

作成するもの：

```text
content.config.ts

content/
├─ works/
└─ experiences/

data/
├─ profile.ts
├─ skills.ts
└─ links.ts
```

まず仮データを数件登録する。

---

## Phase 3：ルーティング作成

以下のページを作成する。

```text
/
/about
/works
/works/[slug]
```

この時点ではデザインは最低限でよい。

例えば、

```text
Walk City
React / TypeScript / Supabase

詳しく見る
```

程度の表示だけでよい。

---

## Phase 4：データ表示

Content Collectionsからデータを取得して表示する。

確認すること：

* Works一覧が表示できる
* Works詳細が表示できる
* Markdown本文を表示できる
* Experienceを時系列順に並べられる
* Skill IDからスキル情報を取得できる

この段階でサイトの機能的な構造を完成させる。

---

## Phase 5：コンポーネント分割

繰り返し使用するUIをコンポーネント化する。

例：

```text
Header
Footer
WorkCard
SkillList
Timeline
SectionTitle
```

ページ側にはなるべくデータ取得とレイアウトだけを書く。

---

## Phase 6：UIデザイン

構造が完成した後にデザインを実装する。

主に調整するもの：

* 色
* フォント
* 余白
* カードデザイン
* タイムライン
* スキルアイコン
* アニメーション
* レスポンシブ対応

---

## Phase 7：コンテンツ追加

最後に実際の文章や画像を追加する。

* 制作物説明
* スクリーンショット
* 技術構成図
* 経歴
* スキル
* 自己紹介

デザインとコンテンツを分離しているため、Markdownやデータファイルを追加・変更するだけで更新できる状態を目指す。

---

# 11. 実装方針

開発順序は、

```text
データ構造
↓
ルーティング
↓
データ取得
↓
最低限の表示
↓
コンポーネント整理
↓
UIデザイン
↓
アニメーションなどの仕上げ
```

とする。

最初から完成形のUIを作らず、まず

**「データを追加すれば正しいページに正しい情報が表示される」**

ところまで作る。

その後、UIのみを変更してもデータ構造やページ構成に影響しない設計を目指す。
