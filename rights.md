# Rights

> tldr; **Skip to Access Levels**

### Entity

All objects are treated identically in Entu. In our jargon we call them *entities* and they have *properties*. Every entity has its type defined by *entity-definition* and its properties by *property-definition*, which are also entities. Therefore the fundamental objects in Entu are entity-definitions of entity-definition and property-definition. You better do not delete these entities.

### Hierarchy

Entities could be arranged hierarchically by parent-child relationships, i.e. Folder type entity could be parent of Folder or File type of entities. Circular relations are allowed and its up to configuration and user interface to deal with it.

- Every entity-definition could have its 'allowed-child(s)' defined.
- Some entities could have its own 'allowed-child(s)' defined in which case it overrides 'allowed-childs' from definition.
- Every entity-definition could have its 'default-parent(s)' defined in which case all entities of that kind are assigned as childs to these parent(s)

### Visibility

Entities can have different visibility

- Public  
  Public properties of entity are potentially accessible (view-only) through public API. Either via "public view" or any 3rd-party application utilizing API.
- Domain  
  Public properties of entity are accessible (view-only) for authenticated users
- Private  
  All properties are accessible for authorized users

### Access Levels

There are number of different access levels in use. Each next level gives additional rights

- viewer  
  User with viewer rights can only view the entity
- expander  
  Add childs to entity
- editor  
  Edit the entity  
  Delete the entity
- owner  
  Manage rights

Any entity could have any number of access rights on another entity

### Propagation

When an entity is assigned as child under another entity, then  
- its visibility is compared with the visibility of the parent and the more restrictive one is applied
- all access rights are propagated from the parent entity

### Access Rights

There are two kinds of access rights

- Primary Access Rights (PAR)  
  are rights explicitly given to one entity on target entity. PAR is an object with following properties:
  - Grantor - reference to entity that gave the right
  - Grantee - reference to entity that got the right
  - Level - string ('viewer'|'expander'|'editor'|'owner')  
  When higher level access is granted, then lower level PAR's to same entity are added automatically  
  When higher level access gets removed, then lower level PAR's from same entity are removed also
- Secondary Access Rights (SAR)  
  When PAR or SAR is granted, then SAR is granted to all child entities (with one *exception* described below). SAR is an object with following properties:  
  - Grantor - same as parent's Grantor
  - Grantee - same as parent's Grantee
  - Level - same as parent's Level
  - Cause - reference to parent entity that was the cause for creating this SAR  
  When PAR or SAR gets removed from entity, then all SAR's, that refer to this entity from its Cause property, are also removed

There are couple of system parameters to determine the scope of access rights propagation.

- give viewer rights to referred entities  
  - *true*: not propagating (*exception*) 'viewer' SAR is granted to all referred entities
  - *false*: no additional rights are created for referred entities
- forced hierarchical propagation
  - *true*: SAR's are created to (removed from) all child entities
  - *false*: SAR's are created to (removed from) child entities, where grantor has 'owner' rights

## Use Cases

### Role

It's often useful to have certain roles or right groups for convenient user management. Let's emulate a 'book-keeper' role with help of mechanics described above.  
Our goal is to make sure, that all book-keepers have at least viewer rights to all invoices and agreements. Assume that invoices (entity definition *Invoice*) are organised in folders (*Folder*) with structure

- <Year> Invoices
  - Inbound Invoices
  - Outgoing Invoices

and agreements in *Folders* with structure

- Contracts with Suppliers
- Contracts with Employees

To achive desired result there are multiple of ways to configure the system. One possibility (in rough lines) would be

1. Create additional folder "Book-keeper Role"
2. Create additional folder "Invoices"
3. Add all "<Year> Invoices" folders as childs to "Invoices" folder
4. Add "Invoices" as child to "Book-keeper Role"
5. Add "Contracts with Suppliers" as child to "Book-keeper Role"
6. Add "Contracts with Employees" as child to "Book-keeper Role"
7. Add all current bookkeepers as 'viewers' to "Book-keeper Role"

Now 'viewer' rights get propagated through child folders to all invoices and contracts and if new documents are added to any of those folders, all book-keepers get immediate access.


