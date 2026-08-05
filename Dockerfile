# 运行阶段 - 直接使用预编译二进制（由 GitHub Actions 多平台编译生成）
FROM alpine:3.20

ARG TARGETARCH

LABEL maintainer="cppla <https://cpp.la>"

RUN apk add --no-cache ca-certificates tzdata \
    && mkdir -p /app/config /app/data /app/web

# 复制 GitHub Actions 中预编译好的二进制产物
# 映射关系: serverstatus-linux-amd64 / serverstatus-linux-arm64 -> serverstatus
COPY serverstatus-linux-${TARGETARCH} /usr/local/bin/serverstatus
RUN chmod +x /usr/local/bin/serverstatus

COPY server/config.json /app/config/config.json
COPY web /app/web/

ENV TZ=Asia/Shanghai \
    CONFIG_PATH=/app/config/config.json \
    STATS_PATH=/app/data/stats.json \
    WEB_DIR=/app/web \
    HTTP_ADDR=:80 \
    AGENT_ADDR=:35601

EXPOSE 80 35601

HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/api/health || exit 1

ENTRYPOINT ["/usr/local/bin/serverstatus"]