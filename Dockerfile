# Use the specific bun image version as the base
FROM oven/bun:1.1 as base

# Copy the package.json and bun.lockb (if exists) files
COPY package.json bun.lockb* ./

# Copy the source directory and prisma schema
COPY src ./src
COPY prisma ./prisma

# Install dependencies using bun
RUN bun install --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the Bun application
CMD ["bun", "run", "src/index.ts"]