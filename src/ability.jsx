import { AbilityBuilder, Ability } from '@casl/ability';

export function defineAbilityFor(role) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (role === 'admin') {
    can('manage', 'all'); // Admin can do everything
  } else {
    can('read', 'Task');
    can('create', 'Task');
    cannot('delete', 'Task'); // Non-admins can't delete tasks
  }

  return build();
}
