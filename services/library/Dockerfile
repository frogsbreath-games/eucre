# Configure base image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Configure build image from sdk
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src/Platform.Library.Api
COPY Platform.Library.Api/*.csproj .
RUN dotnet restore
COPY Platform.Library.Api/. .
RUN dotnet build -c Release -o /app/build

# Configure testing image from build image
FROM build AS testing
WORKDIR /src/Platform.Library.Tests
COPY Platform.Library.Tests/*.csproj .
RUN dotnet restore
COPY Platform.Library.Tests/. .
RUN dotnet test

# Configure publishing image from build image
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Configure final image from base image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Platform.Library.Api.dll"]