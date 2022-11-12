import { generate } from '@ant-design/colors';

export const primaryColor = "#834655"

type GenerateTheme = 'default' | 'dark'

export function generateAntColors(color: string, theme: GenerateTheme = "default") {
    return generate(color, {
        theme
    })
}