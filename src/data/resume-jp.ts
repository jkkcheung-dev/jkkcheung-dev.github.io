import type { Resume } from '@/types';

export const resumeJP: Resume = {
    greetings: "はじめまして! ジャック です",
    cantonName: "チョン カキット",
    cantonDesc: "広東語での私の名前です",
    role: "ソフトウェアエンジニア | Software Engineer",
    location: "香港",
    email: "jackcheungkk@gmail.com",
    github: "https://github.com/jkkcheung-dev",
    linkedin: "https://www.linkedin.com/in/jack-cheung-75a621149",
    about: [
        "ソフトウェアエンジニアとして、これまで主にJavaのSpringBootを使ったバックエンド開発や、React.jsでのフロントエンド開発に携わってきました",
        "前職では、開発だけでなく、ELKとRedisを活用したログの管理システムや、PrometheusとGrafanaを使った自動監視システムを構築しました。これにより、障害対応にかかる時間を大幅に減らすことができました",
        "現職でも、開発以外、AWSやCI/CD、Kubernetesなどを利用した開発・テスト環境の実装を担当しています。また、若手エンジニアのサポートも担当してきました"
    ],
    education: {
        school: "香港大学",
        degree: "工程部 コンピュータサイエンス学系",
        location: "現在",
        period: "2013 - 2017"
    },
    experiences: [
        {
            company: "政府歯科サービス",
            role: "Analyst Programmer",
            employmentType: "派遣社員",
            period: "May 2021 - 現在",
            location: "香港",
            highlights: [
                "約6000名の公的歯科サービス職員が利用する患者記録管理システム（全11モジュール）のうち、3つのモジュール開発に従事しました。主にReactJSによるフロントエンド開発、及びSpring Boot (Java)を用いたバックエンド開発を担当し、RedisやAWSのサービス活用を通じて、ユーザーエクスペリエンスの向上に貢献しました",
                "利用者へのヒアリングを通じて要件の整理・分析を行いました。その上で、システムの過度な複雑化を回避しつつ、ビジネス目標や技術的安定性を考慮した改修提案や優先順位の調整を進めました",
                "開発・テスト環境を従来のオンプレミスからAWSのEC2及びEKSへ移行し、高可用性の実現とインフラ管理のオーバーヘッド削減に貢献しました。また、GitHub Actionsを用いたCI/CDパイプラインの構築にも携わり、デプロイの自動化による品質向上とチームの工数削減につなげました",
                "本番環境で発生した利用者からの問い合わせに対し、Kubernetes上のアプリケーションログを調査・分析し、問題の解決にあたりました",
                "ジュニアエンジニアに対しては、チームのコーディング規約に基づいた実装やドキュメント作成のサポートを行いました。また、チームへの順応を促し、彼らの意見をマネージャーに伝えることで、チーム全体の成長を支援しました"
            ]
        },
        {
            company: "Orient Overseas Container Line Limited",
            role: "Assistant Technical Analyst",
            employmentType: "正社員",
            period: "Jun 2019 - Oct 2020",
            location: "香港",
            highlights: [
                "社内船積み書類マッピングシステムのレガシーなTibcoソフトウェアから、Spring Bootによる分散サービスへの移行プロジェクトに参画しました。この移行により、チーム間の連携コストの削減や、コンポーネントの独立したスケーラビリティ向上に貢献しました",
                "サービスディスカバリ、サーキットブレーカー、外部設定といったマイクロサービスのベストプラクティスを導入し、社内レガシーシステムの一部コンポーネントの置き換えを行いました。CI/CDパイプラインの導入にも携わり、迅速かつ安全なデプロイ体制の構築を通して、システム全体の保守性やパフォーマンス向上に繋げました",
                "チームのトラブルシューティング効率を向上させるため、ログのフレームワークやフォーマットの標準化、およびログの一元管理をチームに提案しました。これにより、運用コストの高い既存ソリューションからの移行を目指しました",
                "50以上のアプリケーションから日々創出される90GB超のログを一元管理するため、ELKとRedisクラスタを用いた基盤の構築を、概念実証（POC）からオンプレミスの本番環境導入まで担当しました。この基盤により、本番障害発生時の対応時間が平均120分から40分へと約60%短縮されるなど、アプリケーションの信頼性向上に貢献しました",
                "PrometheusとGrafanaを用いたコンテナのリアルタイム監視およびアラート通知の仕組みを構築しました。これにより、運用スタッフの業務を支援し、オペレーション全体の効率化に貢献しました"
            ]
        },
        {
            company: "IWT Solution",
            role: "Programmer",
            employmentType: "正社員",
            period: "Sep 2017 - Jun 2019",
            location: "香港",
            highlights: [
                "JavaおよびNode.jsを使用し、顔認証アルゴリズムと連携するRESTful APIサービスの設計・実装に携わりました。顔画像をメタデータと共に安全に登録するテンプレート機能を開発し、セキュアなアクセスとビジネス分析のための顔特徴データ抽出を実現しました。このシステムは1日に1万件以上の顔認証を処理し、オペレーションの高度化とセキュリティ強化に貢献しました",
                "ショッピングモールの駐車場アプリと駐車管理システムを連携させるためのRESTful APIサーバー開発を担当しました。APIドキュメントの作成から実装までを一貫して行い、オペレーションの効率化と利用者の体験向上に貢献しました",
                "VRフィットネスアプリケーションの開発プロジェクトにおいて、コンセプト設計やハードウェア調査からプロトタイプ制作までを中心的に担当しました。Unity3Dエンジンを用い、APIで抵抗・傾斜を制御するスマートバイクトレーナーと360度パノラマ動画を統合し、インタラクティブなフィットネス体験の概念実証（PoC）を行いました"
            ]
        }
    ],
    skills: {
        "言語": ["JavaScript", "TypeScript", "Java", "Python", "Go", "Shell", "SQL"],
        "フレームワーク": ["React", "Node.js", "Spring Boot"],
        "Storages": ["PostgreSQL", "MySQL", "Oracle SQL", "Kafka", "Redis"],
        "クラウド & DevOps": ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Ansible"],
        "その他": ["Elasticsearch+Logstash+Kibana", "Prometheus", "Grafana"]
    },
    languages: {
        "ネイティヴ": ["広東語"],
        "ビジネス": ["英語", "中国語"],
        "日常会話": ["日本語 N2"]
    },
    certifications: {
        "Certified Kubernetes Administrator - CKA": "https://www.credly.com/badges/c17a77ef-f7ef-4bda-88b3-ec30d7192ebc/",
        "AWS Certified Solutions Architect – Professional": "https://www.credly.com/badges/2cef58e3-9eb1-4d4d-bfb4-99df9f3cd0b9/",
        "AWS Certified Developer – Associate": "https://www.credly.com/badges/10fbb3c8-3163-4c2e-ab04-8d2ee8b6767d/",
        "AWS Certified SysOps Administrator – Associate": "https://www.credly.com/badges/2add2378-b692-427c-bed8-4e52eca45caf/"
    }

}
