import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "clean" | "default"
declare module "/Users/ismail9k/projects/ismail9k/ismail9k.com/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}