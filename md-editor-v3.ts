import { config } from 'md-editor-v3'
import { lineNumbers } from '@codemirror/view'

config({
    codeMirrorExtensions(_theme, extensions) {
        return [...extensions, lineNumbers()]
    }
})