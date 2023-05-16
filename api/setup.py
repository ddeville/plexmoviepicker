from setuptools import find_packages, setup

setup(
    name="plexmoviepicker",
    version="0.0.1",
    packages=find_packages("."),
    install_requires=[
        "flask==2.3.2",
        "gunicorn==20.1.0",
    ],
    test_requires=[],
    package_data={
        "plexmoviepicker": ["py.typed"],
    },
)
