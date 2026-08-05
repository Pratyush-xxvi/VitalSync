package com.prescripto.backend.repository;

import java.util.Optional;
import com.prescripto.backend.model.ERole;
import com.prescripto.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // This method lets us find a role by its name (e.g., "ROLE_USER")
    Optional<Role> findByName(ERole name);
}

