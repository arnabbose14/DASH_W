/**
 * Resolves templated variables like {{variable_name}} within a string
 */
export const resolveString = (
  text: string | undefined,
  variables: Record<string, any>
): string => {
  if (text === undefined || text === null) return '';
  const str = String(text);
  return str.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    const trimmedKey = key.trim();
    return variables[trimmedKey] !== undefined ? String(variables[trimmedKey]) : `{{${trimmedKey}}}`;
  });
};

/**
 * Resolves a specific component property. If it has a binding to a variable key,
 * it returns the variable value; otherwise it returns the local prop.
 */
export const resolveProp = (
  propKey: string,
  bindings: Record<string, string> | undefined,
  variables: Record<string, any>,
  localProps?: Record<string, any>
): any => {
  if (!bindings) return localProps?.[propKey];
  const varName = bindings[propKey];
  if (varName && variables[varName] !== undefined) {
    return variables[varName];
  }
  
  // Also try to resolve if the local prop itself has {{templates}}
  const localVal = localProps?.[propKey];
  if (typeof localVal === 'string') {
    return resolveString(localVal, variables);
  }
  
  return localVal;
};
