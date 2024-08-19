ARG NODE_VERSION=20

# 1. Create an image to build n8n
FROM --platform=linux/amd64 n8nio/base:${NODE_VERSION} AS builder

# Build the application from source
WORKDIR /src
COPY . /src
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store --mount=type=cache,id=pnpm-metadata,target=/root/.cache/pnpm/metadata pnpm install --frozen-lockfile
RUN pnpm build

# Delete all dev dependencies
RUN jq 'del(.pnpm.patchedDependencies)' package.json > package.json.tmp; mv package.json.tmp package.json
RUN node .github/scripts/trim-fe-packageJson.js

# Delete any source code, source-mapping, or typings
RUN find . -type f -name "*.ts" -o -name "*.js.map" -o -name "*.vue" -o -name "tsconfig.json" -o -name "*.tsbuildinfo" | xargs rm -rf

# Deploy the `n8n` package into /compiled
RUN mkdir /compiled
RUN NODE_ENV=production pnpm --filter=n8n --prod --no-optional deploy /compiled

# 2. Start with a new clean image with just the code that is needed to run n8n
FROM n8nio/base:${NODE_VERSION}
ENV NODE_ENV=production

# ARG N8N_RELEASE_TYPE=dev
ARG N8N_RELEASE_TYPE=stable
ENV N8N_RELEASE_TYPE=${N8N_RELEASE_TYPE}

ENV N8N_TEMPLATES_ENABLED=false
ENV N8N_PERSONALIZATION_ENABLED=false
ENV N8N_VERSION_NOTIFICATIONS_ENABLED=false
ENV N8N_DIAGNOSTICS_ENABLED=false
ENV EXTERNAL_HOOK_FILES=
ENV EXTERNAL_FRONTEND_HOOKS_URLS=
ENV N8N_DIAGNOSTICS_CONFIG_FRONTEND=
ENV N8N_DIAGNOSTICS_CONFIG_BACKEND=
ENV N8N_HIRING_BANNER_ENABLED=false

ENV N8N_ENCRYPTION_KEY="ahd@bne_UJY0gwy!yfm"

ENV N8N_AI_ENABLED=true
ENV N8N_AI_OPENAI_API_KEY="sk-proj-nHtt6uyrY9Ch9gubcBNqT3BlbkFJSRFyy5OYoLud9Kz0c20p"

ENV LANGCHAIN_TRACING_V2=true
ENV LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
ENV LANGCHAIN_API_KEY="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"
ENV LANGCHAIN_CALLBACKS_BACKGROUND=true

WORKDIR /home/node
COPY --from=builder /compiled /usr/local/lib/node_modules/n8n
COPY docker/images/n8n/docker-entrypoint.sh /

RUN \
	cd /usr/local/lib/node_modules/n8n && \
	npm rebuild sqlite3 && \
	cd - && \
	ln -s /usr/local/lib/node_modules/n8n/bin/n8n /usr/local/bin/n8n && \
	mkdir .n8n && \
	chown node:node .n8n

ENV SHELL /bin/sh
USER node
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
