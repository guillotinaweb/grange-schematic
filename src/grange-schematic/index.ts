import {
    Rule,
    SchematicContext,
    Tree,
    url,
    mergeWith,
    apply,
    template,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function grangeSchematic(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const pckJson: any = JSON.parse(tree.read('package.json')!.toString('utf-8'));
        pckJson.dependencies['@guillotinaweb/grange'] = 'latest';
        pckJson.dependencies['@guillotinaweb/grange-core'] = 'latest';
        pckJson.dependencies['@guillotinaweb/grange-form'] = 'latest';
        pckJson.dependencies['@guillotinaweb/ngx-state-traverser'] = 'latest';
        pckJson.dependencies['@guillotinaweb/pastanaga-angular'] = 'latest';
        pckJson.dependencies['angular-traversal'] = 'latest';
        pckJson.dependencies['ngx-schema-form'] = 'latest';
        pckJson.dependencies['@angular/cdk'] = '^9.1.0';
        pckJson.dependencies['@ngrx/core'] = '1.2.0';
        pckJson.dependencies['@ngrx/effects'] = '8.6.0';
        pckJson.dependencies['@ngrx/store'] = '8.6.0';
        pckJson.dependencies['angular-svg-icon'] = '^8.0.0';
        pckJson.dependencies['date-fns'] = '^2.9.0';
        pckJson.dependencies['jexl'] = '^2.2.2';
        pckJson.dependencies['z-schema'] = '^4.2.2';
        pckJson.scripts['guillotina'] = 'docker-compose -f g-api/docker-compose.yaml up';
        tree.overwrite('package.json', JSON.stringify(pckJson, null, 2));
        _context.addTask(new NodePackageInstallTask());

        const angular = JSON.parse(tree.read('angular.json')!.toString('utf-8'));
        const project: WorkspaceProject = angular.projects[angular.defaultProject];
        project.architect!.build.options.assets = [
            ...project.architect!.build.options.assets,
            {
                glob: '**/*',
                input: './node_modules/@guillotinaweb/pastanaga-angular/lib/assets',
                output: 'assets'
            }
        ];
        project.architect!.build.options.stylePreprocessorOptions = {
            includePaths: [
                './node_modules/@guillotinaweb/pastanaga-angular/lib/styles'
            ]
        };
        project.architect!.build.options.styles = [
            'src/pastanaga.scss',
            ...project.architect!.build.options.styles,
        ];
        angular.projects[angular.defaultProject] = project;
        tree.overwrite('angular.json', JSON.stringify(angular, null, 2));
        const templates = url('./files');
        const generatedSources = apply(templates, [
            template({..._options, ...strings}),
        ]);
        return mergeWith(generatedSources)(tree, _context);
    };
}
