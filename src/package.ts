import { PackageURL } from 'packageurl-js'

/**
 * Package is module that can be depended upon in manifest or build target. A
 * package is what you would download from a registry like NPM.
 * We consider all packages that are defined in the [Package URL spec](https://github.com/package-url/purl-spec/blob/1eae1e95d81fddf8ae7f06b4dfc7b5b5be0cc3e2/PURL-TYPES.rst) as being valid package types.
 */
export class Package {
  /**
   * @type {PackageURL}
   */
  packageURL: PackageURL
  /**
   * @type {Array<Package>}
   */
  dependencies: Array<Package> // eslint-disable-line no-use-before-define

  /**
   * A Package can be constructed with a PackageURL or a string conforming to
   * the Package URL format (https://github.com/package-url/purl-spec)
   *
   * @param {PackageURL | string} pkg
   */
  constructor(pkg: PackageURL | string) {
    if (typeof pkg === 'string') {
      this.packageURL = PackageURL.fromString(pkg)
    } else {
      this.packageURL = pkg
    }
    this.dependencies = []
  }

  /**
   * Associate a package child dependency with this package
   *
   * @param {Package} pkg
   * @returns {Package}
   */
  dependsOn(pkg: Package): Package {
    this.dependencies.push(pkg)
    return this
  }

  /**
   * Add multiple packages as dependencies.
   *
   * @param {Array} pkgs
   * @returns {Package}
   */
  dependsOnPackages(pkgs: Array<Package>): Package {
    pkgs.forEach((pkg) => this.dependsOn(pkg))
    return this
  }

  /**
   * packageDependencyIDs provides the list of package IDs of package dependencies
   */
  get packageDependencyIDs() {
    return this.dependencies.map((dep) => dep.packageID())
  }

  /**
   * packageID generates the unique package ID (currently, the Package URL)
   *
   * @returns {string}
   */
  packageID(): string {
    return this.packageURL.toString()
  }

  /**
   * name of the package
   *
   * @returns {string}
   */
  name(): string {
    return this.packageURL.name
  }

  /**
   * version of the package
   *
   * @returns {string}
   */
  version(): string {
    return this.packageURL.version || ''
  }
}
