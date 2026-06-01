{{/*
Expand the name of the chart.
*/}}
{{- define "plexmoviepicker.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "plexmoviepicker.fullname" -}}
{{- $name := .Chart.Name }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "plexmoviepicker.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels.
*/}}
{{- define "plexmoviepicker.labels" -}}
helm.sh/chart: {{ include "plexmoviepicker.chart" . }}
app.kubernetes.io/name: {{ include "plexmoviepicker.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels.
*/}}
{{- define "plexmoviepicker.selectorLabels" -}}
app.kubernetes.io/name: {{ include "plexmoviepicker.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Container images.
*/}}
{{- define "plexmoviepicker.image" -}}
{{- if .Values.image.digest }}
{{- printf "%s@%s" .Values.image.repository .Values.image.digest }}
{{- else }}
{{- printf "%s:%s" .Values.image.repository (default .Chart.AppVersion .Values.image.tag) }}
{{- end }}
{{- end }}

{{/*
The Secret that contains the Plex auth token.
*/}}
{{- define "plexmoviepicker.authTokenSecretName" -}}
{{- required "Set plex.authTokenSecret.name" .Values.plex.authTokenSecret.name }}
{{- end }}
