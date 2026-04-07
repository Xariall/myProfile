from django.db import migrations


def seed(apps, schema_editor):
    Experience = apps.get_model("portfolio", "Experience")
    Education = apps.get_model("portfolio", "Education")
    Certification = apps.get_model("portfolio", "Certification")

    Experience.objects.bulk_create([
        Experience(
            role="Senior AI Engineer",
            company="Company Name",
            period="20XX – Present",
            location="City, Country",
            type="full-time",
            description=(
                "Leading the development of production-grade ML systems for [domain]. "
                "Responsible for model architecture, training infrastructure, and deployment pipelines."
            ),
            achievements=(
                "Reduced model inference latency by XX% through optimization techniques\n"
                "Led a team of X engineers to ship [product feature] used by XXX+ users\n"
                "Designed and implemented a real-time recommendation system at scale"
            ),
            tags="PyTorch,MLOps,LLMs,Kubernetes",
            sort_order=0,
        ),
        Experience(
            role="Machine Learning Engineer",
            company="Company Name",
            period="20XX – 20XX",
            location="City, Country",
            type="full-time",
            description=(
                "Developed and maintained ML models for [use case]. "
                "Collaborated with product and data teams to define model requirements and evaluation metrics."
            ),
            achievements=(
                "Built an NLP pipeline processing XX million documents per day\n"
                "Improved model accuracy by XX% through feature engineering and architecture changes\n"
                "Established MLOps best practices adopted across the engineering org"
            ),
            tags="Python,TensorFlow,Airflow,AWS",
            sort_order=1,
        ),
        Experience(
            role="AI Research Intern",
            company="Research Lab / University",
            period="20XX – 20XX",
            location="City, Country",
            type="internship",
            description=(
                "Conducted research on [topic] under the supervision of [Professor/Lead]. "
                "Contributed to publications and open-source tooling."
            ),
            achievements=(
                "Co-authored a paper accepted at [Conference Name]\n"
                "Implemented baseline models for [benchmark/task]\n"
                "Contributed to an open-source library with XXX+ GitHub stars"
            ),
            tags="Research,PyTorch,NLP,Academic",
            sort_order=2,
        ),
    ])

    Education.objects.bulk_create([
        Education(
            degree="M.Sc.",
            field="Artificial Intelligence / Computer Science",
            institution="University Name",
            period="20XX – 20XX",
            gpa="X.X / 4.0",
            thesis="Thesis: [Title of your thesis on a relevant AI topic]",
            sort_order=0,
        ),
        Education(
            degree="B.Sc.",
            field="Computer Science / Mathematics",
            institution="University Name",
            period="20XX – 20XX",
            gpa="X.X / 4.0",
            thesis="",
            sort_order=1,
        ),
    ])

    Certification.objects.bulk_create([
        Certification(name="Deep Learning Specialization", issuer="Coursera / DeepLearning.AI", date="20XX", credential_id="XXXX-XXXX", badge="🧠", sort_order=0),
        Certification(name="AWS Certified Machine Learning – Specialty", issuer="Amazon Web Services", date="20XX", credential_id="XXXX-XXXX", badge="☁️", sort_order=1),
        Certification(name="TensorFlow Developer Certificate", issuer="Google", date="20XX", credential_id="XXXX-XXXX", badge="⚡", sort_order=2),
        Certification(name="Professional Data Engineer", issuer="Google Cloud", date="20XX", credential_id="XXXX-XXXX", badge="🔧", sort_order=3),
        Certification(name="MLOps Specialization", issuer="Coursera / DeepLearning.AI", date="20XX", credential_id="XXXX-XXXX", badge="🚀", sort_order=4),
        Certification(name="Reinforcement Learning Specialization", issuer="Coursera / University of Alberta", date="20XX", credential_id="XXXX-XXXX", badge="🎯", sort_order=5),
    ])


def unseed(apps, schema_editor):
    apps.get_model("portfolio", "Experience").objects.all().delete()
    apps.get_model("portfolio", "Education").objects.all().delete()
    apps.get_model("portfolio", "Certification").objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0003_add_new_models_and_fields"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
