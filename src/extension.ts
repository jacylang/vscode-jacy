import {
    Disposable,
    IndentAction,
    languages,
    ExtensionContext,
} from 'vscode';

export async function activate(context: ExtensionContext) {
    context.subscriptions.push(
        ...[
            languageConfig(),
        ]
    )
}

function languageConfig(): Disposable {
    return languages.setLanguageConfiguration('jacy', {
        onEnterRules: [
            {
                beforeText: /^\s*\/{3}.*$/,
                action: {
                    indentAction: IndentAction.None,
                    appendText: '/// '
                },
            },
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                    appendText: ' * ',
                },
            },
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                    appendText: ' * ',
                },
            },
            {
                beforeText: /^(\ \ )*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                    appendText: '* ',
                },
            },
            {
                beforeText: /^(\ \ )*\ \*\/\s*$/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                    removeText: 1,
                },
            },
        ]
    })
}