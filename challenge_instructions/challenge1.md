ITU BLOCKCHAIN 
HAFTALIK SOLIDITY CHALLENGE’I

Hafta 1: 

Basit Tanım: Bu hafta basitleştirilmiş bir nft yapıyoruz, challengeda size yardımcı olması için itü blockchain eğitiminden 5,6,7,8 numaralı videoları izleyebilirsiniz.

Kontrat Spesifikasyonu: 

Events:
    1. WarriorCreated (parametreleri: (name, attack, defense))

Structs:
    1.  fakeWarrior (parametreleri: (name, attack, defense))

Modifiers:
    1. isValidAttributes (parametreleri: (attack, defense))
    2. onlyOwner (parametreleri: ())


Mappings:
    1. warriors
    2. warriorOwner
    3. whitelisted


State Variables: 

    1. Owner (kontrat sahibi, public)
    2. tokenId (kontrat bakiyesi, private)

Constructor
	1. Constructor (Owner’ı kontratı deploy eden kişi yapmalı)

Functions:

    1. Constructor (Owner’ı kontratı deploy eden kişi yapmalı)
    2. createWarrior (isValidAttributes modifierini kullanmalı)
    3. whitelist (onlyOwner modifierini kullanmalı)
    4. getWarrior (warrior return etmeli)
    5. getOwnerOfWarrior (ownerOfWarrior return etmeli)

Fonksiyonlar doğru şekilde view ya da pure olarak etiketlenmeli.
