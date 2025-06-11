{{/*
Full name.
*/}}
{{- define "dispatchai-frontend.fullname" -}}
{{ printf "%s-%s" .Chart.Name .Values.environment }}
{{- end }}

{{/*
Image name.
*/}}
{{- define "dispatchai-frontend.image" -}}
{{ printf "%s:%s" .Values.image.repository (toString .Values.image.tag) }}
{{- end -}}
