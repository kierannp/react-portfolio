# Container for the Grouper interactive demo (deployed to Google Cloud Run).
# Builds Grouper's C++ extension from source against conda-forge RDKit + nauty.
FROM condaforge/miniforge3:24.9.2-0

# Which Grouper commit to build. Default: mosdef-hub/Grouper main @ v0.0.5.
# Point this at a commit that includes `random_sample` to let the sampling
# tab go up to 12 groups per molecule (otherwise it is capped at 6).
ARG GROUPER_REPO=https://github.com/mosdef-hub/Grouper.git
ARG GROUPER_REF=137e9be64c465361fd9b370b36d0a50cddaf634e

COPY environment.yml /tmp/environment.yml
RUN mamba env create -f /tmp/environment.yml && mamba clean -afy

ENV CONDA_PREFIX=/opt/conda/envs/grouper
ENV PATH=/opt/conda/envs/grouper/bin:$PATH

RUN git clone --filter=blob:none "$GROUPER_REPO" /opt/grouper-src \
 && cd /opt/grouper-src \
 && git checkout "$GROUPER_REF" \
 && pip install --no-build-isolation --no-deps . \
 && cd / && rm -rf /opt/grouper-src \
 && python -c "import Grouper; print('Grouper', Grouper.__version__)"

# Run as an unprivileged user.
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    GRADIO_ANALYTICS_ENABLED=False \
    MPLCONFIGDIR=/tmp/matplotlib \
    GROUPER_PROCS=2
WORKDIR /home/user/app
COPY --chown=user app.py .

EXPOSE 7860
CMD ["python", "app.py"]
